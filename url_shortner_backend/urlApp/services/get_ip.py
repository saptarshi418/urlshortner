from ipware import get_client_ip as get_client_ip_ipware

def get_client_ip(request):
    ip, is_routable = get_client_ip_ipware(request)  
    if ip:
        return True , ip

    # fallback 1: check X-Forwarded-For manually
    xff = request.META.get('HTTP_X_FORWARDED_FOR')
    if xff:
        return True , xff.split(',')[0].strip()

    # fallback 2: check X-Real-IP (some proxies set this instead)
    x_real_ip = request.META.get('HTTP_X_REAL_IP')
    if x_real_ip:
        return True , x_real_ip.strip()

    # fallback 3: last resort, direct connection IP
    remote_addr = request.META.get('REMOTE_ADDR')
    if remote_addr:
        return True , remote_addr

    return False , None  # truly nothing found