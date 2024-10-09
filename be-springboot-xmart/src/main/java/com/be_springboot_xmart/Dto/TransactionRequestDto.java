package com.be_springboot_xmart.Dto;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionRequestDto {
    private String _id;

    private String qr_code;

    private String rfid;

    private String product_name;

    private BigDecimal unit_price;

    private Integer amount;

    private BigDecimal total_price;

    private Date transaction_date;
}
