# Generated by Django 5.0.3 on 2024-03-14 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_react_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApprenticeshipStandard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('standardName', models.CharField(max_length=300)),
                ('standardReference', models.CharField(max_length=6)),
                ('standardLevel', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6')], max_length=1)),
            ],
        ),
        migrations.RenameModel(
            old_name='React',
            new_name='UserInfo',
        ),
    ]
