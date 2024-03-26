"""
URL configuration for sdeprototype project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ReactView.as_view(), name="loginHopeful"),
    path('register', UserRegistrationAPIView.as_view(), name="registration"),
    path('login', UserLoginAPIView.as_view(), name="userLogin"),
    path('logout', UserLogout.as_view(), name="userLogout"),
    path('user', UserView.as_view(), name="user"),
    path('query', QueryView.as_view(), name="query"),
    path('queryApprentices', QueryApprenticeView.as_view(), name="apprenticeQuery"),
    path('queryInput', QueryInput.as_view(), name="queryInput"),
    path('username', UsernameCheck.as_view(), name='username'),
]
