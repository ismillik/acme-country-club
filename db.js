const Sequelize = require('sequelize');
const { Datatypes: {DATE, STRING, UUID, UUIDV4} } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-country-club-db');

const members = ['moe', 'lucy', 'larry', 'ethyl'];
const facilities = ['tennis', 'ping-pong', 'raquet-ball', 'bowling'];

const Member = conn.define('member', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    first_name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            max: 20
        }
    }
})

const Facility = conn.define('facility', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    fac_name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            max: 100
        }
    }
});

const Booking = conn.define('booking', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    startTime: {
        type: DATE,
        allowNull: false
    },
    endTime: {
        type: DATE,
        allowNull: false
    }
} )

Member.belongsTo(Member, { as: 'sponsor'});
Member.hasMany(Member, { as: 'sponsees', foreignKey: 'sponsorId'});

Booking.belongsTo(Member);
Booking.belongsTo(Facility);


const syncAndSeed = async ()=> {
    await conn.sync( {force: true})
    await Promise.all ([])    


}

module.exports = {
    syncAndSeed,
    models: {

    }
}