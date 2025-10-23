package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.dev.model.Apartment;
import com.klef.dev.repository.ApartmentRepository;

@Service
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private ApartmentRepository repository;

    @Override
    public Apartment addApartment(Apartment apartment) {
        return repository.save(apartment);
    }

    @Override
    public List<Apartment> getAllApartments() {
        return repository.findAll();
    }

    @Override
    public Apartment getApartmentById(int id) {
        Optional<Apartment> opt = repository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Apartment updateApartment(Apartment apartment) {
        return repository.save(apartment);
    }

    @Override
    public void deleteApartmentById(int id) {
        repository.deleteById(id);
    }
}
