from django.urls import path
from api.views import CityViews, CitizenViews, TouristViews, CountryViews, views

urlpatterns = [
    # lab 1
    path('citizens/', CitizenViews.CitizenList.as_view()),
    path('citizens/<int:pk>/', CitizenViews.CitizenDetail.as_view()),

    path('cities/', CityViews.CityList.as_view()),
    path('cities/<int:pk>/', CityViews.CityDetailView.as_view()),

    path('countries/', CountryViews.CountryList.as_view()),
    path('countries/<int:pk>/', CountryViews.CountryDetail.as_view()),

    path('tourists/', TouristViews.TouristList.as_view()),
    path('tourists/<int:pk>/', TouristViews.TouristDetailView.as_view()),

    # lab2 filter citizens by wage min working
    path('citizens-filter-by-wage/<int:wage>/', CitizenViews.MinimumWage.as_view()),
    # lab2 extra features working
    # example 1 http://127.0.0.1:8000/api/cities/
    # example 2 http://127.0.0.1:8000/api/cities/8/
    # example 3 http://127.0.0.1:8000/api/citizens/
    # example 4 http://127.0.0.1:8000/api/citizens/4/

    # lab3 statistical report working : show tourists ordered descending by their country average money
    # country average money is calculated as arithmetic mean of all the visited countries' money of the tourist
    # example http://127.0.0.1:8000/api/tourists/by-avg-money
    # tourist2 visited 2 countries and (avg_money = c1money+c2money) / 2
    path('tourists/by-avg-money/', views.TouristsByAvgMoney.as_view(), name='tourists-by-avg-money'),

    # TRY 1
    # lab3 extra feature working
    # statistical report showing citizens ordered descending by their city's country's average countryPopulation
    # citizens -> city
    # city -> country
    # we have 4 citizens which leave in city 8 (Barcelona) which is part of country 1 and country 2
    # avg population = (c1 pop + c2 pop / 2)
    path('citizens/by-avg-population/', views.CitizensByAvgPopulation.as_view(), name='citizens-by-avg-population'),

    # LAB4 bulk add
    path('city/<int:pk>/citizens/', views.CitizenCityView.as_view()),

    # LAB5 cities by average citizens' age
    path('cities/by-avg-age/', views.CitiesByAvgAge.as_view(), name='cities-by-avg-age')
]

# not needed
#       # lab2 filter countries by population not working
#       path('countries/filter-by-population/<int:population>', views.CountryFilterPopulation.as_view()),
#
#       # lab 1 not working
#       # path('tourists/<int:pk>/cities', views.TouristCitiesList.as_view()),
#
#       # lab 3 not working
#       # path('cities/by-avg-money', views.CitiesByAvgMoney.as_view(), name='cities-by-avg-money'),
#       # path('cities/by-avg-population', views.CitiesByAvgPopulation.as_view(), name='cities-by-avg-population'),