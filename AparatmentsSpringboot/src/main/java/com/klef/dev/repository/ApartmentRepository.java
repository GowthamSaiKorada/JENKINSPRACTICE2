package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.model.Apartment;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Integer> {
    // Add custom queries if needed
}
