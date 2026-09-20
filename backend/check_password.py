from utils.hashing import verify_password

# Hash from database
stored_hash = '$2b$12$BE3zxSWU2R40JxMN6CTKxuleRTr7STOc2ZP43IxogyLPNiMmbv3t.'
password = 'example'

result = verify_password(password, stored_hash)
print(f'Password verification result: {result}')
