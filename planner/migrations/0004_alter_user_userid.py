# Generated by Django 4.1.3 on 2022-11-11 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0003_user_last_login_user_superuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='userid',
            field=models.IntegerField(db_column='userId', default=9999, primary_key=True, serialize=False),
        ),
    ]