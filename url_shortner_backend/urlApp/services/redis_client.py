from dotenv import load_dotenv
import os
import redis
# from django.conf import settings 


ratelimit_redis = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port =int(os.getenv("REDIS_PORT")),
    db=int(os.getenv("RATELIMIT_CACHE_DB")),
    decode_responses=True,
)

url_redis = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port =int(os.getenv("REDIS_PORT")),
    db=int(os.getenv("URL_CACHE_DB")),
    decode_responses=True,
)

redirect_userdata_redis =  redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port =int(os.getenv("REDIS_PORT")),
    db=int(os.getenv("REDIRECTED_USER_CACHE_DB")),
    decode_responses=True,
)

