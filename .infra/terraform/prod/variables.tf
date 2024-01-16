variable "vault_token" {
  description = "Vault token"
  type        = string
  sensitive   = true
}

variable "vault_address" {
  description = "Vault address"
  type        = string
}

variable "kube_config_path" {
  description = "Path to kube config"
  type        = string
  default     = "~/.kube/config-vm.yaml"
}
