const { Schema, model, Types } = require('mongoose');

const adSchema = new Schema({
    title: { type: String, trim: true, maxlength: 85, default: 'Novo anúncio', required:true },
    intro: { type: String, trim: true, maxlength: 500, required:true },
    homeinfo: { type: String, trim: true, maxlength: 500, required:true },
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
    duties: { type: String, trim: true, maxlength: 500, required:true },
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
                street: { type: String, trim: true, required:true },
                number: { type: Number, required:true },
            },
            { _id: false }
        ),
        required: false,
    },
    availableDates: {
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date, default: Date.now },
    },
    pets: [{ type: Types.ObjectId, ref: 'Pet' }],
    user: { type: Types.ObjectId, ref: 'User' },
    reviews: [{ type: Types.ObjectId, ref: 'Review' }],
    picturesUrl: [{ type: String, trim: true }],
});

const AdModel = model("Ad", adSchema);

module.exports = AdModel;
