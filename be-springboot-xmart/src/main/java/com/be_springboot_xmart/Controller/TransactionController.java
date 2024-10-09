package com.be_springboot_xmart.Controller;

import com.be_springboot_xmart.Dto.TransactionRequestDto;
import com.be_springboot_xmart.Dto.TransactionResponseDto;
import com.be_springboot_xmart.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/transaction")
    public List<TransactionResponseDto> findAll() {
        return transactionService.findAll();
    }

    @GetMapping("/transaction/{id}")
    public TransactionResponseDto findById(@PathVariable("id") String id) {
        return transactionService.findById(id);
    }

    @PostMapping("/transaction")
    public TransactionResponseDto create(@RequestBody TransactionRequestDto transaction) {
        return transactionService.create(transaction);
    }

    @PutMapping("/transaction")
    public TransactionResponseDto edit(@RequestBody TransactionRequestDto transaction) {
        return transactionService.edit(transaction);
    }

    @DeleteMapping("/transaction/{id}")
    public void deleteById(@PathVariable("id") String id) {
        transactionService.deleteById(id);
    }
}
