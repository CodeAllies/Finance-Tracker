package com.example.financeTracker.Finance.Tracker.Controller;


import com.example.financeTracker.Finance.Tracker.DAO.CategoryRepository;
import com.example.financeTracker.Finance.Tracker.DAO.ExpenseDAO;
import com.example.financeTracker.Finance.Tracker.Entity.Category;
import com.example.financeTracker.Finance.Tracker.Entity.Expense;
import com.example.financeTracker.Finance.Tracker.Entity.ExpenseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/myApi")
public class ExpenseRestController {

    private ExpenseDAO expenseDAO;
    private CategoryRepository categoryRepository;
    private Expense expense;

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

    @GetMapping("/expenses/{id}")
    Expense findExpense(@PathVariable int id) {
        return expenseDAO.find(id);
    }

    @DeleteMapping("/expenses/{id}")
    void removeAllExpenses(@PathVariable int id){
        expenseDAO.delete(id);
    }


    @PutMapping("/expense")
    void updateExpense(@RequestBody ExpenseDTO expenseDTO) {

        Expense existingExpense = expenseDAO.find(expenseDTO.getExpenseId());
        if (existingExpense == null) {
            throw new RuntimeException("Expense with id " + expenseDTO.getExpenseId() + " not found");
        }

        Category category = categoryRepository.findById(expenseDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existingExpense.setAmount(expenseDTO.getAmount());

        if (expenseDTO.getDate() != null) {
            existingExpense.setDate(expenseDTO.getDate());
        }

        existingExpense.setCategory(category);

        expenseDAO.update(existingExpense);
    }


}
