from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    # lab 1
    path('citizens/', views.CitizenList.as_view()),
    path('citizens/<int:pk>/', views.CitizenDetail.as_view()),

    path('cities/', views.CityList.as_view()),
    path('cities/<int:pk>/', views.CityDetail.as_view()),

    path('countries/', views.CountryList.as_view()),
    path('countries/<int:pk>/', views.CountryDetail.as_view()),

    path('tourists/', views.TouristList.as_view()),
    path('tourists/<int:pk>/', views.TouristDetail.as_view()),

    # lab2 filter citizens by wage min working
    path('citizens-filter-by-wage/<int:wage>/', views.MinimumWage.as_view()),
    # lab2 extra features working
    # example 1 http://127.0.0.1:8000/api/cities/
    # example 2 http://127.0.0.1:8000/api/cities/8/
    # example 3 http://127.0.0.1:8000/api/citizens/
    # example 4 http://127.0.0.1:8000/api/citizens/4/

    # lab3 statistical report working : show tourists ordered descending by their country average money
    # country average money is calculated as arithmetic mean of all the visited countries' money of the tourist
    # example http://127.0.0.1:8000/api/tourists/by-avg-money
    # tourist2 visited 2 countries and (avg_money = c1money+c2money) / 2
    path('tourists/by-avg-money', views.TouristsByAvgMoney.as_view(), name='tourists-by-avg-money'),

    # TRY 1
    # lab3 extra feature working
    # statistical report showing citizens ordered descending by their city's country's average countryPopulation
    # citizens -> city
    # city -> country
    # we have 4 citizens which leave in city 8 (Barcelona) which is part of country 1 and country 2
    # avg population = (c1 pop + c2 pop / 2)
    path('citizens/by-avg-population', views.CitizensByAvgPopulation.as_view(), name='citizens-by-avg-population'),

    # LAB4 bulk add
    path('city/<int:pk>/citizens/', views.CitizenCityView.as_view())

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