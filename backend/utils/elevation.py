import requests
import os

def get_elevation(lat, lon):
    """
    Fetch elevation data for a given lat/lon.
    Tries multiple APIs in order of preference.
    """
    # Try Open-Elevation API first (most reliable)
    try:
        url = f"https://api.open-elevation.com/api/v1/lookup?locations={lat},{lon}"
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get("results") and len(data["results"]) > 0:
                elevation = data["results"][0].get("elevation")
                if elevation is not None:
                    return round(float(elevation), 2)
    except Exception as e:
        print(f"[WARNING] Open-Elevation API failed: {e}")
    
    # Fallback to OpenTopoData API
    try:
        url = f"https://api.opentopodata.org/v1/test-dataset?locations={lat},{lon}"
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get("results") and len(data["results"]) > 0:
                elevation = data["results"][0].get("elevation")
                if elevation is not None:
                    return round(float(elevation), 2)
    except Exception as e:
        print(f"[WARNING] OpenTopoData API failed: {e}")
    
    # Final fallback: Return 0 if all APIs fail
    print(f"[WARNING] Could not fetch elevation for {lat}, {lon}. Returning 0.")
    return 0.0
