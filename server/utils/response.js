export function apiResponse(res, { status = 200, success = true, data = null, message = null, error = null }) {
  const body = { success };
  if (data !== null) body.data = data;
  if (message) body.message = message;
  if (error) body.error = error;
  return res.status(status).json(body);
}

export function paginate(res, { items, total, page = 1, limit = 50 }) {
  return apiResponse(res, {
    status: 200,
    success: true,
    data: { items, total, page, limit, pages: Math.ceil(total / limit) },
  });
}
