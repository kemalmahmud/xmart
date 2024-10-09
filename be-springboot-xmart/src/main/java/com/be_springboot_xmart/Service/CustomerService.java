package com.be_springboot_xmart.Service;

import com.be_springboot_xmart.Dto.CustomerRequestDto;
import com.be_springboot_xmart.Dto.CustomerResponseDto;
import com.be_springboot_xmart.Model.Customer;
import com.be_springboot_xmart.Repository.CustomerRepository;
import com.be_springboot_xmart.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerResponseDto findById(String id) {
        var res = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found."));

        return CustomerResponseDto.builder().qrCode(res.getQrCode()).name(res.getName()).wallet(res.getWallet()).build();
    }

    public List<CustomerResponseDto> findAll() {
        var custList =  customerRepository.findAll();
        var res = new ArrayList<CustomerResponseDto>();

        custList.forEach(customer -> {
            CustomerResponseDto cust = new CustomerResponseDto();
            cust.setQrCode(customer.getQrCode());
            cust.setName(customer.getName());
            cust.setWallet(customer.getWallet());
            res.add(cust);
        });

        return res;
    }

    public CustomerResponseDto create(CustomerRequestDto customer) {
        Customer cust = new Customer();
        cust.setQrCode(UUID.randomUUID().toString());
        cust.setName(customer.getName());
        cust.setWallet(customer.getWallet());
        var res = customerRepository.save(cust);

        return CustomerResponseDto.builder().qrCode(res.getQrCode()).name(res.getName()).wallet(res.getWallet()).build();
    }

    public CustomerResponseDto edit(CustomerRequestDto customer) {
        var cust = customerRepository.findById(customer.getQrcode())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found."));

        cust.setName(customer.getName());
        cust.setWallet(customer.getWallet());

        var res = customerRepository.save(cust);

        return CustomerResponseDto.builder().qrCode(res.getQrCode()).name(res.getName()).wallet(res.getWallet()).build();
    }

    public void deleteById(String id) {
        customerRepository.deleteById(id);
    }
}
