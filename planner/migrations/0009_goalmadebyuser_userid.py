# Generated by Django 4.1.3 on 2022-11-29 07:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0008_alter_goalmadebyuser_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='goalmadebyuser',
            name='userid',
            field=models.ForeignKey(blank=True, db_column='userId', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]
