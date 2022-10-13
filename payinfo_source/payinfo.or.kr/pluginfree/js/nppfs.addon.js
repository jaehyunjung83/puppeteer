var npAddon = new function() {
    var isRunning = false;
    var ku = false;
  
    // ��ǰ�� ��å - Ű���庸��
    var policy = {
      product_uuid : "ec3c102037e938618a75377b3dc24f13f67847d8f96dcf2fadd5dd5c8397a259"
      // ��������
      , support : {
        aF : {
          aX : true, 
          di : {qs : "5.0", Oc : "10.0"},
          al : {
            IE : {aX : true, qs : "7.0", Oc : "11.0"},
            FF : {aX : true, qs : "4.0"},
            CR : {aX : true, qs : "4.0"},
            OP : {aX : true, qs : "9.0"},
            SF : {aX : true, qs : "5.0"},
            EG : {aX : true, qs : "1.0"},
            fv : {aX : false},
            B360 : {aX : true, qs : "4.0"},   // Chrome Version
            QQ : {aX : true, qs : "8.0"}    // IE Version
          }
        }
        , jV : {
            aX : true,
            di : {qs : "10.8", Oc : "10.13" },
            al : {
              IE : {aX : false},
              FF : {aX : true, qs : "18.0"},
              CR : {aX : true, qs : "21.0"},
              SF : {aX : true, qs : "6.0"},
              OP : {aX : true, qs : "30.0"}
            }
          }
        , bx : {aX : false}
      }
    };
  
    /*
      ���������� ȯ������ �Ǵ��ϴ� �Լ�(�ʼ�)
      ���� : true, ������ : false
    */
    this.isSupported = function() {
      if(D.isMobileDevice() || D.isMetroUi()) {
        return false;
      }
      return D.isSupported(policy.support);
    };
    
    /*
      ���డ���� �������� �Ǵ��ϴ� �Լ�(�ʼ�)
      isSupported�ʹ� �ٸ��� Ư���������� ��뿩�θ� �����Ͽ� ���ۿ��θ� �Ǵ�
      ���డ�� : true, ����Ұ��� : false
    */
    this.isRunnable = function(){
      return this.isSupported();
    };
  
    /*
      ������¸� ��ȯ�ϴ� �Լ�(�ʼ�)
      ������ : true, �̽����� : false
    */
    this.isRunning = function(){
      return isRunning;
    };
  
    /*
      ����ó�� �ϷῩ�θ� ��ȯ�ϴ� �Լ�(�ʼ�)
      �Ϸ� �Ǵ� ������ȯ�� : true, �̿Ϸ� : false
    */
    this.bA = function() {
      if(!this.isSupported()) {
        return true;
      }
      return ku;
    };
  
    /*
      �������� �������� �� ������ �ʱ�ȭ �۾� �Լ�(�ʼ�)
    */
    this.init = function(){
    };
    
    /*
      ��ǰ�� ������Ű�� �۾� �Լ�(�ʼ�)
    */
    this.startup = function(){
      ku = true;
      isRunning = true;
      nq(document).trigger({ type: "nppfs-module-startup", target: "addon-yessign", time: new Date() }); // nppfs-1.9.0�� �̿��ϸ� �� ���� �߰��Ǿ�� �Ѵ�.
    };
    
    /*
      �������� ����� �� ������ ���� �۾� �Լ�(�ʼ�)
    */
    this.bm = function() {
    };
  };
  
  /*
    �������α׷� ��ǰ Addon���� ���
  */
  npPfsPlugins.define({
    "id" : "addon-yessign"    // ��ǰ �����ڵ�(��ī���ͳݹ߱�)
    , "name" : "nProtect Online Security V1.0 for Addon"    // ��ǰ��
    , "handshake" : true    // �������α׷����� ��Ż�뿩��. true : ���, false : �̻��
    , "endtoend" : false    // E2E ��뿩��. true : ���, false : �̻��
    , "runvirtualos" : true   // ����ü������ ���� ���ɿ���. true : ������, false : ��������
    , "controller" : npAddon  // �������α׷� ���� ���� ��ũ��Ʈ �ڵ�
  });
