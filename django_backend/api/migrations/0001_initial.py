# Generated by Django 4.2 on 2023-04-25 10:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cityName', models.CharField(max_length=100)),
                ('cityPopulation', models.IntegerField()),
                ('cityArea', models.IntegerField()),
                ('cityMoney', models.IntegerField()),
                ('cityDescription', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Tourist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('touristName', models.CharField(max_length=100)),
                ('touristAge', models.IntegerField()),
                ('touristMoney', models.IntegerField()),
                ('touristPhone', models.CharField(max_length=20)),
                ('touristEmail', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('countryName', models.CharField(max_length=100, unique=True)),
                ('countryCities', models.CharField(max_length=100)),
                ('countryPopulation', models.IntegerField()),
                ('countryMoney', models.IntegerField()),
                ('countryDescription', models.CharField(max_length=100)),
                ('countryCity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cityCountry', to='api.city')),
                ('countryTourist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='touristCountry', to='api.tourist')),
            ],
        ),
        migrations.CreateModel(
            name='Citizen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('citizenName', models.CharField(max_length=100)),
                ('citizenAge', models.IntegerField()),
                ('citizenMoney', models.IntegerField()),
                ('citizenWage', models.IntegerField()),
                ('citizenPhone', models.CharField(max_length=20)),
                ('citizenCity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cityCitizen', to='api.city')),
            ],
        ),
    ]
