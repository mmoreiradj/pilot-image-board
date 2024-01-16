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

variable "namespace" {
  description = "Namespace"
  type        = string
}

variable "image_tags" {
  description = "Image tags"
  type        = string
}

variable "charts_target_revision" {
  description = "Charts target revisions"
  type        = string
}
