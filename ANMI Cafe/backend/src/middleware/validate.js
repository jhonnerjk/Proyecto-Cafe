// Middleware de validación usando Zod
export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const data = req[source];
      const parsed = schema.parse(data);
      req.validated = req.validated || {};
      req.validated[source] = parsed;
      next();
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Datos inválidos',
          detalles: error.errors
        });
      }
      next(error);
    }
  };
};

export default validate;
