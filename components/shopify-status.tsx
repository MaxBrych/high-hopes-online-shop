import { getShopifyConfigStatus } from "@/lib/shopify-server"
import { AlertCircle, CheckCircle, Settings } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ShopifyStatus() {
  const status = getShopifyConfigStatus()

  if (status.isConfigured) {
    return (
      <Alert className="mb-4 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Shopify Connected</AlertTitle>
        <AlertDescription className="text-green-700">Successfully connected to {status.domain}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-800">Shopify Configuration Needed</AlertTitle>
      <AlertDescription className="text-orange-700">
        <div className="space-y-2">
          <p>To connect to your Shopify store, please configure:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {status.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <div className="mt-3 p-3 bg-orange-100 rounded text-sm">
            <p className="font-medium mb-1">Current Status:</p>
            <p>Domain: {status.domain || "Not set"}</p>
            <p>Token: {status.hasToken ? `Set (${status.tokenLength} chars)` : "Not set"}</p>
          </div>
          <p className="text-sm mt-2">
            <Settings className="inline w-4 h-4 mr-1" />
            Using demo products until Shopify is configured.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  )
}
