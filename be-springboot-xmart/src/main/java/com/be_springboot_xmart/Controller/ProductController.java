package com.be_springboot_xmart.Controller;

import com.be_springboot_xmart.Dto.ProductRequestDto;
import com.be_springboot_xmart.Dto.ProductResponseDto;
import com.be_springboot_xmart.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/product")
    public List<ProductResponseDto> findAll() {
        return productService.findAll();
    }

    @GetMapping("/product/{rfid}")
    public ProductResponseDto findById(@PathVariable("rfid") String rfid) {
        return productService.findById(rfid);
    }

    @PostMapping("/product")
    public ProductResponseDto create(@RequestBody ProductRequestDto product) {
        return productService.create(product);
    }

    @PutMapping("/product")
    public ProductResponseDto edit(@RequestBody ProductRequestDto product) {
        return productService.edit(product);
    }

    @DeleteMapping("/product/{rfid}")
    public void deleteById(@PathVariable("rfid") String rfid) {
        productService.deleteById(rfid);
    }
}

