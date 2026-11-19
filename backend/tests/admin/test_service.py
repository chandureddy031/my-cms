from server.admin.service import KeyCheck, check_admin_key
from server.config.config import load_config

DEV = load_config({})
PROD_NO_KEY = load_config({"RENDER": "true"})


def test_right_key_passes():
    assert check_admin_key(DEV.admin_key, DEV) is KeyCheck.OK


def test_wrong_or_empty_key_is_rejected():
    assert check_admin_key("nope", DEV) is KeyCheck.WRONG
    assert check_admin_key("", DEV) is KeyCheck.WRONG


def test_server_without_usable_key_reports_not_configured():
    assert check_admin_key("anything", PROD_NO_KEY) is KeyCheck.NOT_CONFIGURED
