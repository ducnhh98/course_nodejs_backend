export default {
  // 2xx
  OK: 'Success',
  CREATED: 'Created',
  ACCEPTED: 'Accepted',
  NO_CONTENT: 'No Content',

  // 3xx
  MOVED_PERMANENTLY: 'Moved Permanently',
  NOT_MODIFIED: 'Not Modified',

  // 4xx
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized', // Quan trọng cho bảo mật (sai Token/Login)
  FORBIDDEN: 'Forbidden', // Có Token nhưng không có quyền truy cập
  NOT_FOUND: 'Not Found',
  METHOD_NOT_ALLOWED: 'Method Not Allowed',
  REQUEST_TIMEOUT: 'Request Timeout',
  CONFLICT: 'Conflict',
  PAYLOAD_TOO_LARGE: 'Payload Too Large',
  UNSUPPORTED_MEDIA_TYPE: 'Unsupported Media Type',
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity', // Thường dùng cho lỗi Logic/Validation
  TOO_MANY_REQUESTS: 'Too Many Requests', // Chống brute-force/spam

  // 5xx
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NOT_IMPLEMENTED: 'Not Implemented',
  BAD_GATEWAY: 'Bad Gateway',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  GATEWAY_TIMEOUT: 'Gateway Timeout'
}
