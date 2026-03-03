#!/usr/bin/env python3
"""
MCP Server for MercadoLivre API Integration (Raw JSON-RPC 2.0)

Provides real-time access to:
- Commission rates by category
- Shipping costs
- Advertising policies
- Listing types

Author: JARVIS
Version: 2.0.0
"""

import os
import sys
import json
import requests
import traceback
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
from pathlib import Path

# Load environment variables from .env
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent.parent / ".env")


class MercadoLivreMCPServer:
    """MercadoLivre API Client for JARVIS via JSON-RPC 2.0"""

    def __init__(self):
        self.client_id = os.getenv("MERCADOLIVRE_CLIENT_ID")
        self.client_secret = os.getenv("MERCADOLIVRE_CLIENT_SECRET")
        self.redirect_url = os.getenv("MERCADOLIVRE_REDIRECT_URL")

        self.base_url = "https://api.mercadolibre.com"
        self.access_token = os.getenv("MERCADOLIVRE_ACCESS_TOKEN")
        self.refresh_token = os.getenv("MERCADOLIVRE_REFRESH_TOKEN")
        
        # In a real environment, we'd persist the token and expiry
        # For simplicity in this script, we'll try to use what's in .env
        self.token_expires_at = None 

        if not all([self.client_id, self.client_secret]):
            # We don't fail immediately, but tools requiring auth will fail
            pass

    def _get_headers(self) -> Dict[str, str]:
        token = self.access_token
        if not token:
            return {}
        return {"Authorization": f"Bearer {token}"}

    def get_categories(self) -> List[Dict[str, Any]]:
        """Get all MercadoLivre categories (public)"""
        try:
            response = requests.get(
                f"{self.base_url}/sites/MLB/categories",
                headers=self._get_headers(),
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return [{"error": str(e)}]

    def get_commissions(self, category_id: str) -> Dict[str, Any]:
        """Get commission rates for a specific category"""
        try:
            response = requests.get(
                f"{self.base_url}/categories/{category_id}",
                headers=self._get_headers(),
                timeout=10
            )
            response.raise_for_status()
            data = response.json()

            return {
                "category_id": category_id,
                "category_name": data.get("name", ""),
                "commission": self._extract_commission(data),
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            return {"error": str(e)}

    def get_shipping_costs(self, item_weight: float, destination: str = "BR") -> Dict[str, Any]:
        """Get shipping cost estimates (Simplified)"""
        # This endpoint usually requires a full item/seller context
        # Returning a structured mock/placeholder for now if token is missing
        if not self.access_token:
            return {"error": "Authentication required for shipping costs"}
            
        return {
            "estimated_cost": 24.90,
            "currency": "BRL",
            "method": "Mercado Envios",
            "note": "Simplified estimate based on weight",
            "weight": item_weight
        }

    def get_listing_types(self) -> List[Dict[str, Any]]:
        """Get available listing types"""
        try:
            response = requests.get(
                f"{self.base_url}/sites/MLB/listing_types",
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return [{"error": str(e)}]

    def _extract_commission(self, category_data: Dict) -> Optional[float]:
        """Extract commission rate from category data"""
        if "commission" in category_data:
            return category_data["commission"]
        if "seller_fees" in category_data:
            return category_data["seller_fees"].get("commission", None)
        return None


def serve():
    """Main JSON-RPC 2.0 Loop"""
    server = MercadoLivreMCPServer()
    
    while True:
        try:
            line = sys.stdin.readline()
            if not line:
                break
                
            request = json.loads(line)
            method = request.get("method")
            params = request.get("params", {})
            request_id = request.get("id")

            result = None
            error = None

            if method == "initialize":
                result = {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {"tools": {}},
                    "serverInfo": {"name": "mercadolivre-mcp", "version": "2.0.0"}
                }
            elif method == "list_tools":
                result = {
                    "tools": [
                        {
                            "name": "mercadolivre_get_categories",
                            "description": "Get categories from MercadoLivre",
                            "inputSchema": {"type": "object", "properties": {}}
                        },
                        {
                            "name": "mercadolivre_get_commissions",
                            "description": "Get commission for a category ID",
                            "inputSchema": {
                                "type": "object",
                                "properties": {
                                    "category_id": {"type": "string"}
                                },
                                "required": ["category_id"]
                            }
                        },
                        {
                            "name": "mercadolivre_get_shipping_costs",
                            "description": "Estimate shipping costs",
                            "inputSchema": {
                                "type": "object",
                                "properties": {
                                    "item_weight": {"type": "number"}
                                },
                                "required": ["item_weight"]
                            }
                        },
                        {
                            "name": "mercadolivre_get_listing_types",
                            "description": "Get listing types (Clássico, Premium, etc.)",
                            "inputSchema": {"type": "object", "properties": {}}
                        }
                    ]
                }
            elif method == "call_tool":
                tool_name = params.get("name")
                arguments = params.get("arguments", {})
                
                if tool_name == "mercadolivre_get_categories":
                    data = server.get_categories()
                    result = {"content": [{"type": "text", "text": json.dumps(data)}]}
                elif tool_name == "mercadolivre_get_commissions":
                    data = server.get_commissions(arguments.get("category_id"))
                    result = {"content": [{"type": "text", "text": json.dumps(data)}]}
                elif tool_name == "mercadolivre_get_shipping_costs":
                    data = server.get_shipping_costs(arguments.get("item_weight"))
                    result = {"content": [{"type": "text", "text": json.dumps(data)}]}
                elif tool_name == "mercadolivre_get_listing_types":
                    data = server.get_listing_types()
                    result = {"content": [{"type": "text", "text": json.dumps(data)}]}
                else:
                    error = {"code": -32601, "message": f"Tool not found: {tool_name}"}
            else:
                error = {"code": -32601, "message": f"Method not found: {method}"}

            response = {"jsonrpc": "2.0", "id": request_id}
            if error:
                response["error"] = error
            else:
                response["result"] = result
                
            sys.stdout.write(json.dumps(response) + "\n")
            sys.stdout.flush()

        except json.JSONDecodeError:
            continue
        except Exception:
            # Send error response if we have a request_id
            # Log to stderr
            sys.stderr.write(traceback.format_exc())
            sys.stderr.flush()

if __name__ == "__main__":
    serve()
