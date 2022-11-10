from django.urls import path
from . import views

urlpatterns = [
    path('foods/', views.show_foods),
    path('foods/<int:id>/', views.show_food_detail),
]