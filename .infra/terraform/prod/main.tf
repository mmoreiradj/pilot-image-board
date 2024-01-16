
resource "kubernetes_namespace" "pilot-image-board" {
  metadata {
    name = "pilot-image-board"
  }
}

module "pilot-image-board" {
  source = "../modules/pilot-image-board"

  back_host  = "api-pilot.do.moreiradj.net"
  front_host = "pilot.do.moreiradj.net"
  namespace  = kubernetes_namespace.pilot-image-board.metadata[0].name
}
