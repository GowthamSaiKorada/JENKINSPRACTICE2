package com.klef.dev.service;

import java.util.List;
import com.klef.dev.model.Apartment;

public interface ApartmentService {
    Apartment addApartment(Apartment apartment);
    List<Apartment> getAllApartments();
    Apartment getApartmentById(int id);
    Apartment updateApartment(Apartment apartment);
    void deleteApartmentById(int id);
}
