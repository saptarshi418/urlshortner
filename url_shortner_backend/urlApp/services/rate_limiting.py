from urlApp.services.redis_client import ratelimit_redis

class RateLimiter:

    @staticmethod
    def allow_anonymous(ip , limit=3 , window=3600):
        key = f'rate:ip:{ip}'
        

        count = ratelimit_redis.incr(key)

        if int(count) == 1:
            ratelimit_redis.expire(key ,window)
        
        if int(count) <= limit:
            return True 
        return False
    

    @staticmethod
    def allow_logged_user(user , limit=5 , window=3600):
        key = f'rate:user:{user.pk}'
        

        count = ratelimit_redis.incr(key)

        if int(count) == 1:
            ratelimit_redis.expire(key ,window)
        
        if int(count) <= limit:
            return True 
        return False



        