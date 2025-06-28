package com.Tracker.expenseTracker.DAO;

import com.Tracker.expenseTracker.Entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface CategoryRepository extends JpaRepository<Category, Integer> {}
