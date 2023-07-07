import redisConfig from '../../config/redis'

export default {
    name: 'ChangeQueue',
    options: {
        redis: redisConfig
    }
}