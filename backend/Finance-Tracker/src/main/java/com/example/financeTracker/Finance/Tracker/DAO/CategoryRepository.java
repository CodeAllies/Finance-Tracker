package com.example.financeTracker.Finance.Tracker.DAO;

import com.example.financeTracker.Finance.Tracker.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface CategoryRepository extends JpaRepository<Category, Integer> {}

