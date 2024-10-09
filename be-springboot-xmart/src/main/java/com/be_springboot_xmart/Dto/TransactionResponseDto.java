package com.be_springboot_xmart.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionResponseDto {
    private Integer transactionId;

    private String qrCode;

    private String rfid;

    private String productName;

    private BigDecimal unitPrice;

    private Integer amount;

    private BigDecimal totalPrice;

    private Date transactionDate;
}
