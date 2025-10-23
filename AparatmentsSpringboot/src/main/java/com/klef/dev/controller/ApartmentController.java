package com.klef.dev.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.model.Apartment;
import com.klef.dev.service.ApartmentService;

@RestController
@RequestMapping("/aapi/")
@CrossOrigin(origins = "*")
public class ApartmentController {

    @Autowired
    private ApartmentService service;

    @GetMapping("/")
    public String home() {
        return "Apartment API is running...";
    }

    @PostMapping("/add")
    public ResponseEntity<Apartment> addApartment(@RequestBody Apartment apartment) {
        apartment.setId(null);  // Ensure ID is auto-generated
        Apartment saved = service.addApartment(apartment);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Apartment>> getAllApartments() {
        List<Apartment> apartments = service.getAllApartments();
        return new ResponseEntity<>(apartments, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getApartmentById(@PathVariable int id) {
        Apartment apartment = service.getApartmentById(id);
        if (apartment != null) {
            return new ResponseEntity<>(apartment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Apartment with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateApartment(@RequestBody Apartment apartment) {
        Apartment existing = service.getApartmentById(apartment.getId());
        if (existing != null) {
            Apartment updated = service.updateApartment(apartment);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Apartment with ID " + apartment.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteApartment(@PathVariable int id) {
        Apartment existing = service.getApartmentById(id);
        if (existing != null) {
            service.deleteApartmentById(id);
            return new ResponseEntity<>("Apartment with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Apartment with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
