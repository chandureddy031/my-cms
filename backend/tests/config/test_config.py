from server.config.config import DEV_ADMIN_KEY, DEV_ORIGIN, load_config


def test_development_uses_dev_key_and_database():
    config = load_config({})
    assert not config.production
    assert config.admin_key == DEV_ADMIN_KEY
    assert config.admin_ready
    assert config.database_url == "dbname=foodwave"


def test_production_without_key_disables_admin():
    config = load_config({"RENDER": "true"})
    assert config.production
    assert config.admin_key is None
    assert not config.admin_ready


def test_production_refuses_short_or_default_key():
    assert not load_config({"RENDER": "true", "ADMIN_KEY": "short"}).admin_ready
    assert not load_config({"RENDER": "true", "ADMIN_KEY": DEV_ADMIN_KEY}).admin_ready
    assert load_config({"RENDER": "true", "ADMIN_KEY": "a-long-random-key-123"}).admin_ready


def test_frontend_urls_are_trimmed_and_added_after_dev_origin():
    config = load_config({"FRONTEND_URL": " https://a.org/ , https://b.org ,"})
    assert config.allowed_origins == [DEV_ORIGIN, "https://a.org", "https://b.org"]
