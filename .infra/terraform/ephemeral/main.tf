resource "kubernetes_namespace" "ephemeral-namespace" {
  metadata {
    name = var.namespace
  }
}

module "pilot-image-board" {
  source = "../modules/pilot-image-board"

  back_host              = "api-${var.namespace}.do.moreiradj.net"
  front_host             = "${var.namespace}.do.moreiradj.net"
  namespace              = var.namespace
  image_tags             = var.image_tags
  charts_target_revision = var.charts_target_revision
}
