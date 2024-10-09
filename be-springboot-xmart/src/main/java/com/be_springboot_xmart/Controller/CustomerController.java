package com.be_springboot_xmart.Controller;

import com.be_springboot_xmart.Dto.CustomerRequestDto;
import com.be_springboot_xmart.Dto.CustomerResponseDto;
import com.be_springboot_xmart.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/customer")
    public List<CustomerResponseDto> findAll() {
        return customerService.findAll();
    }

    @GetMapping("/customer/{qrcode}")
    public CustomerResponseDto findById(@PathVariable("qrcode") String qrcode) {
        return customerService.findById(qrcode);
    }

    @PostMapping("/customer")
    public CustomerResponseDto create(@RequestBody CustomerRequestDto customer) {
        return customerService.create(customer);
    }

    @PutMapping("/customer")
    public CustomerResponseDto edit(@RequestBody CustomerRequestDto customer) {
        return customerService.edit(customer);
    }

    @DeleteMapping("/customer/{qrcode}")
    public void deleteById(@PathVariable("qrcode") String qrcode) {
        customerService.deleteById(qrcode);
    }
}
