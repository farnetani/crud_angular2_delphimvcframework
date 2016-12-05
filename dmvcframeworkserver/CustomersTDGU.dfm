object CustomersTDG: TCustomersTDG
  OldCreateOrder = False
  OnCreate = DataModuleCreate
  Height = 275
  Width = 466
  object FDConnection1: TFDConnection
    Params.Strings = (
      'ConnectionDef=CUSTOMERSITDEVCON')
    LoginPrompt = False
    Left = 80
    Top = 48
  end
  object updCustomers: TFDUpdateSQL
    Connection = FDConnection1
    ConnectionName = 'CUSTOMERSITDEVCON'
    InsertSQL.Strings = (
      'INSERT INTO CUSTOMERS'
      '(FIRST_NAME, LAST_NAME, AGE)'
      'VALUES (:NEW_FIRST_NAME, :NEW_LAST_NAME, :NEW_AGE)')
    ModifySQL.Strings = (
      'UPDATE CUSTOMERS'
      
        'SET ID = :NEW_ID, FIRST_NAME = :NEW_FIRST_NAME, LAST_NAME = :NEW' +
        '_LAST_NAME, '
      '  AGE = :NEW_AGE'
      'WHERE ID = :OLD_ID')
    DeleteSQL.Strings = (
      'DELETE FROM CUSTOMERS'
      'WHERE ID = :OLD_ID')
    FetchRowSQL.Strings = (
      'SELECT ID, FIRST_NAME, LAST_NAME, AGE'
      'FROM CUSTOMERS'
      'WHERE ID = :ID')
    Left = 192
    Top = 112
  end
  object dsCustomers: TFDQuery
    Connection = FDConnection1
    SQL.Strings = (
      'select * from customers'
      'order by FIRST_NAME')
    Left = 192
    Top = 48
    object dsCustomersID: TLargeintField
      FieldName = 'ID'
      Origin = 'ID'
      ProviderFlags = [pfInUpdate, pfInWhere, pfInKey]
      Required = True
    end
    object dsCustomersFIRST_NAME: TWideStringField
      FieldName = 'FIRST_NAME'
      Origin = 'FIRST_NAME'
      Size = 100
    end
    object dsCustomersLAST_NAME: TWideStringField
      FieldName = 'LAST_NAME'
      Origin = 'LAST_NAME'
      Size = 100
    end
    object dsCustomersAGE: TIntegerField
      FieldName = 'AGE'
      Origin = 'AGE'
    end
  end
end
