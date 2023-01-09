def parse_request(request_bytes: bytes) -> dict:
    # Split the request string into individual lines
    request_str = request_bytes.decode("utf-8")
    lines = request_str.split("\n")

    # Parse the request line
    request_line = lines[0].split()
    method = request_line[0]
    url = request_line[1]
    version = request_line[2]

    # Parse the headers
    headers = {}
    for line in lines[1:]:
        # If the line is empty, we have reached the end of the headers
        if not line.strip():
            break
        # Otherwise, split the line into a key and value
        key, value = line.split(":", 1)
        headers[key.strip()] = value.strip()

    return {
        'method': method,
        'url': url,
        'version': version,
        'headers': headers,
    }
