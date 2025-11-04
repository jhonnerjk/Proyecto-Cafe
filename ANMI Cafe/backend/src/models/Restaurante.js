import mongoose from 'mongoose';

const GeoPointSchema = new mongoose.Schema({
  type: { type: String, enum: ['Point'], required: true, default: 'Point' },
  coordinates: { type: [Number], required: true } // [lng, lat]
}, { _id: false });

const RestauranteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: GeoPointSchema, required: true },
  direccion: { type: String }
}, { timestamps: true, collection: 'restaurantes' });

RestauranteSchema.index({ ubicacion: '2dsphere' });

export default mongoose.model('Restaurante', RestauranteSchema);
