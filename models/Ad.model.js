const { Schema, model, Types } = require('mongoose');

const adSchema = new Schema({
    title: { type: String, trim: true, maxlength: 85, default: 'Novo anúncio' },
    intro: { type: String, trim: true, maxlength: 500 },
    homeinfo: { type: String, trim: true, maxlength: 500 },
    amenities: {
        type: [String],
        enum: [
            'Casa',
            'Apartamento',
            'Montanha',
            'Praia',
            'Cidade',
            'Wifi',
            'Interior',
            'Acessibilidade',
        ],
    },
    duties: { type: String, trim: true, maxlength: 500 },
    location: {
        type: new Schema(
            {
                country: {
                    type: String,
                    enum: [
                        'Argentina',
                        'Brasil',
                        'Chile',
                        'Mexico',
                        'Estados Unidos',
                        'Canadá',
                        'Inglaterra',
                        'Espanha',
                        'Indonesia',
                        'Japão',
                    ],
                    default: 'Brasil',
                },
                city: {
                    type: String,
                    enum: [
                        'Buenos Aires',
                        'Bariloche',
                        'São Paulo',
                        'Rio de Janeiro',
                        'Santiago',
                        'Cancun',
                        'Nova York',
                        'Miami',
                        'São Francisco',
                        'Toronto',
                        'Vancouver',
                        'Londres',
                        'Madri',
                        'Barcelona',
                        'Bali',
                        'Tokyo',
                    ],
                    default: 'São Paulo',
                },
                street: { type: String, trim: true },
                number: { type: Number },
            },
            { _id: false }
        ),
        required: true,
    },
    availableDates: new Schema({
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date, default: Date.now },
    }),
    pets: [{ type: Types.ObjectId, ref: 'Pet' }],
    user: { type: Types.ObjectId, ref: 'User' },
    reviews: [{ type: Types.ObjectId, ref: 'Review' }],
    picturesUrl: { type: [String], trim: true },
});

module.exports = model('Ad', adSchema);
