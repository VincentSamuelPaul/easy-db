from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRoutes, name='getRoutes'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('runquery/', views.runQuery, name='runQuery'),
]