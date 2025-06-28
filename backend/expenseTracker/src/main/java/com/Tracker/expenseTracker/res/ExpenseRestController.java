package com.Tracker.expenseTracker.res;

import com.Tracker.expenseTracker.DAO.CategoryRepository;
import com.Tracker.expenseTracker.DAO.ExpenseDAO;
import com.Tracker.expenseTracker.Entity.Category;
import com.Tracker.expenseTracker.Entity.Expense;
import com.Tracker.expenseTracker.Entity.ExpenseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/myApi")
public class ExpenseRestController {

    private ExpenseDAO expenseDAO;
    private CategoryRepository categoryRepository;

    @Autowired
    ExpenseRestController(ExpenseDAO expenseDAO,CategoryRepository categoryRepository) {
        this.expenseDAO = expenseDAO;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/expense")
    void addExpense(@RequestBody ExpenseDTO expenseDTO) {

        Category category = categoryRepository.findById(expenseDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Expense expense = new Expense();
        expense.setAmount(expenseDTO.getAmount());
        expense.setDate(expenseDTO.getDate());
        expense.setCategory(category);

        expenseDAO.save(expense);
    }

    @GetMapping("/expenses")
    List<Expense> findAllExpenses() {
        return expenseDAO.findAll();
    }

}
