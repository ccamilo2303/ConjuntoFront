export interface Request {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    tipo: string;
    estado: string;
    descripcion: string;
    comentario: string;
    fechaCreacion: string;
}

export interface Pagination {
    size: number;
    page: number;
    nextPage: number;
}

export interface RequestsResponse {
    solicitudes: Request[];
    pages: Pagination;
}

export interface UpdateStateRequest{
    estadoSolicitud: number;
    motivoRechazo: string;
}