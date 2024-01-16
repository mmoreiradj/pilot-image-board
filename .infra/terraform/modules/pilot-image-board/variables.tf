variable "namespace" {
  description = "Namespace"
  type        = string
}

variable "front_host" {
  description = "Front host"
  type        = string
}

variable "back_host" {
  description = "Back host"
  type        = string
}

variable "image_tags" {
  description = "Image tags"
  type        = string
  default     = ""
}

variable "charts_target_revision" {
  description = "Charts target revisions"
  type        = string
  default     = "HEAD"
}
