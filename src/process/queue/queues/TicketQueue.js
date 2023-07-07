import redisConfig from '../../../config/redis';

export default {
    name: 'TicketQueue',
    options: {
        redis: redisConfig
    }
}