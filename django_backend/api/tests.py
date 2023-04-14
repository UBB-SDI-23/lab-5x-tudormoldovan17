# Create your tests here.

import io

from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from django_backend.api.models import Tourist, Citizen, City, Country
from rest_framework.test import APITestCase


class TouristByAvgMoneyViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        Tourist.objects.create(touristName="Tudor", touristAge=10, touristMoney=1000, touristPhone=1112223334, touristEmail="tudor@yahoo.com")
        Tourist.objects.create(touristName="Darius", touristAge=20, touristMoney=2000, touristPhone=2223334445, touristEmail="darius@yahoo.com")
        Tourist.objects.create(touristName="Andrei", touristAge=30, touristMoney=3000, touristPhone=3334445556, touristEmail="andrei@yahoo.com")
        Tourist.objects.create(touristName="Bogdan", touristAge=40, touristMoney=4000, touristPhone=4445556667, touristEmail="bogdan@yahoo.com")

        City.objects.create(cityName="Barcelona", cityPopulation=100000, cityArea=10000, cityMoney=10000, cityDescription="Best city from Spain and not only")
        City.objects.create(cityName="Cambridge", cityPopulation=200000, cityArea=20000, cityMoney=20000, cityDescription="Beautiful university city and not only")
        City.objects.create(cityName="Springfield", cityPopulation=300000, cityArea=30000, cityMoney=30000, cityDescription="Average USA city")
        City.objects.create(cityName="Milano", cityPopulation=400000, cityArea=40000, cityMoney=40000, cityDescription="Beauty and finesse")
        City.objects.create(cityName="Madrid", cityPopulation=500000, cityArea=50000, cityMoney=50000, cityDescription="Cool city")

        Country.objects.create(countryName="Spain", countryCities="Barcelona, Sevilla, Madrid", countryPopulation=10000000, countryMoney=100000, countryDescription="One of the most beautiful countries from Europe", countryTourist_id=1, countryCity_id=1)
        Country.objects.create(countryName="Venezuela", countryCities="Who knows?", countryPopulation=20000000, countryMoney=200000, countryDescription="There is inflation", countryTourist_id=1, countryCity_id=1)
        Country.objects.create(countryName="Jamaica", countryCities="We don't even know where Jamaica is", countryPopulation=30000000, countryMoney=300000, countryDescription="Bob marley was born there", countryTourist_id=2, countryCity_id=2)
        Country.objects.create(countryName="England", countryCities="London, Manchester, Birmingham, Brighton, Wales, Cambridge", countryPopulation=40000000, countryMoney=400000, countryDescription="Low level country from Europe", countryTourist_id=2, countryCity_id=2)
        Country.objects.create(countryName="Canada", countryCities="Ottawa, Detroit, Canada, Cambridge", countryPopulation=50000000, countryMoney=500000, countryDescription="Polite country", countryTourist_id=2, countryCity_id=2)

    def test_TouristByAvgMoneyView(self):

        response = self.client.get("http://127.0.0.1:8000/api/tourists/by-avg-money")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 4)

        result = JSONRenderer().render(response.data) # transform to JSON from ordered dict.
        output_stream = io.BytesIO(result)
        data = JSONParser().parse(output_stream)

        expected_output = [
            {
                "id": 2,
                "touristName": "Darius",
                "touristAge": 20,
                "touristMoney": 2000,
                "touristPhone": "2223334445",
                "touristEmail": "darius@yahoo.com",
                "avg_countryMoney": 400000.0
            },
            {
                "id": 1,
                "touristName": "Tudor",
                "touristAge": 10,
                "touristMoney": 1000,
                "touristPhone": "1112223334",
                "touristEmail": "tudor@yahoo.com",
                "avg_countryMoney": 150000.0
            },
            {
                "id": 3,
                "touristName": "Andrei",
                "touristAge": 30,
                "touristMoney": 3000,
                "touristPhone": "3334445556",
                "touristEmail": "andrei@yahoo.com",
                "avg_countryMoney": 0
            },
            {
                "id": 4,
                "touristName": "Bogdan",
                "touristAge": 40,
                "touristMoney": 4000,
                "touristPhone": "4445556667",
                "touristEmail": "bogdan@yahoo.com",
                "avg_countryMoney": 0
            }
        ]

        self.assertEqual(expected_output, data)


class TouristByAvgMoneyViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        Tourist.objects.create(touristName="Tudor", touristAge=10, touristMoney=1000, touristPhone=1112223334, touristEmail="tudor@yahoo.com")
        Tourist.objects.create(touristName="Darius", touristAge=20, touristMoney=2000, touristPhone=2223334445, touristEmail="darius@yahoo.com")
        Tourist.objects.create(touristName="Andrei", touristAge=30, touristMoney=3000, touristPhone=3334445556, touristEmail="andrei@yahoo.com")
        Tourist.objects.create(touristName="Bogdan", touristAge=40, touristMoney=4000, touristPhone=4445556667, touristEmail="bogdan@yahoo.com")

        City.objects.create(cityName="Barcelona", cityPopulation=100000, cityArea=10000, cityMoney=10000, cityDescription="Best city from Spain and not only")
        City.objects.create(cityName="Cambridge", cityPopulation=200000, cityArea=20000, cityMoney=20000, cityDescription="Beautiful university city and not only")
        City.objects.create(cityName="Springfield", cityPopulation=300000, cityArea=30000, cityMoney=30000, cityDescription="Average USA city")
        City.objects.create(cityName="Milano", cityPopulation=400000, cityArea=40000, cityMoney=40000, cityDescription="Beauty and finesse")
        City.objects.create(cityName="Madrid", cityPopulation=500000, cityArea=50000, cityMoney=50000, cityDescription="Cool city")

        Country.objects.create(countryName="Spain", countryCities="Barcelona, Sevilla, Madrid", countryPopulation=10000000, countryMoney=100000, countryDescription="One of the most beautiful countries from Europe", countryTourist_id=1, countryCity_id=1)
        Country.objects.create(countryName="Venezuela", countryCities="Who knows?", countryPopulation=20000000, countryMoney=200000, countryDescription="There is inflation", countryTourist_id=1, countryCity_id=1)
        Country.objects.create(countryName="Jamaica", countryCities="We don't even know where Jamaica is", countryPopulation=30000000, countryMoney=300000, countryDescription="Bob marley was born there", countryTourist_id=2, countryCity_id=2)
        Country.objects.create(countryName="England", countryCities="London, Manchester, Birmingham, Brighton, Wales, Cambridge", countryPopulation=40000000, countryMoney=400000, countryDescription="Low level country from Europe", countryTourist_id=2, countryCity_id=2)
        Country.objects.create(countryName="Canada", countryCities="Ottawa, Detroit, Canada, Cambridge", countryPopulation=50000000, countryMoney=500000, countryDescription="Polite country", countryTourist_id=2, countryCity_id=2)

        Citizen.objects.create(citizenCity_id=1, citizenName="Messi", citizenAge=10, citizenMoney=10000, citizenWage=1000, citizenPhone=1112223333)
        Citizen.objects.create(citizenCity_id=1, citizenName="Xavi", citizenAge=20, citizenMoney=20000, citizenWage=2000, citizenPhone=2223334444)
        Citizen.objects.create(citizenCity_id=1, citizenName="Neymar", citizenAge=30, citizenMoney=30000, citizenWage=3000, citizenPhone=3334445555)
        Citizen.objects.create(citizenCity_id=2, citizenName="Kane", citizenAge=40, citizenMoney=40000, citizenWage=4000, citizenPhone=4445556666)
        Citizen.objects.create(citizenCity_id=2, citizenName="Son", citizenAge=50, citizenMoney=50000, citizenWage=5000, citizenPhone=5556667777)

    def test_CitizensByAvgPopulationView(self):

        response = self.client.get("http://127.0.0.1:8000/api/citizens/by-avg-population")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 5)

        result = JSONRenderer().render(response.data) # transform to JSON from ordered dict.
        output_stream = io.BytesIO(result)
        data = JSONParser().parse(output_stream)

        expected_output = [
            {
                "id": 4,
                "citizenName": "Kane",
                "citizenAge": 40,
                "citizenMoney": 40000,
                "citizenWage": 4000,
                "citizenPhone": "4445556666",
                "avg_countryPopulation": 40000000.0
            },
            {
                "id": 5,
                "citizenName": "Son",
                "citizenAge": 50,
                "citizenMoney": 50000,
                "citizenWage": 5000,
                "citizenPhone": "5556667777",
                "avg_countryPopulation": 40000000.0
            },
            {
                "id": 1,
                "citizenName": "Messi",
                "citizenAge": 10,
                "citizenMoney": 10000,
                "citizenWage": 1000,
                "citizenPhone": "1112223333",
                "avg_countryPopulation": 15000000.0
            },
            {
                "id": 2,
                "citizenName": "Xavi",
                "citizenAge": 20,
                "citizenMoney": 20000,
                "citizenWage": 2000,
                "citizenPhone": "2223334444",
                "avg_countryPopulation": 15000000.0
            },
            {
                "id": 3,
                "citizenName": "Neymar",
                "citizenAge": 30,
                "citizenMoney": 30000,
                "citizenWage": 3000,
                "citizenPhone": "3334445555",
                "avg_countryPopulation": 15000000.0
            }
        ]

        self.assertEqual(expected_output, data)
