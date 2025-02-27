import {
  TableColumnPositionValue,
  TableColumnVariantValue,
  TableColumnTypeValue,
  TableColumnStateValue,
  TableColumnProperties
} from '../types';

type TableColumnState = {
  [key in TableColumnStateValue]: string;
};

type TableColumnPosition = {
  [key in TableColumnPositionValue]: TableColumnState;
};

type TableColumnVariant = {
  [key in TableColumnVariantValue]?: TableColumnPosition;
};

type TableColumnType = {
  [key in TableColumnTypeValue]: TableColumnVariant;
};

export const tableColumnRegistry: TableColumnType = {
  [TableColumnTypeValue.Header]: {
    [TableColumnVariantValue.Text]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "8119c24490d41a513c738bc99d6635556eb680d5",
        [TableColumnStateValue.Hover]: "9c59ae635504868a2f761d3c6cd514f5359c2c6c",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "bea490ed0f7386a3d5bf9d1bb4d74e22659e91b3",
        [TableColumnStateValue.Hover]: "180061bc06c25e619933404c73b821283a1c8fc4",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "b63c361889870a6de917e9fffdf17a3d7dfdc51a",
        [TableColumnStateValue.Hover]: "57588e1e8632a26a970931e9f02604716c3244d7",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.Checkbox]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "36411e0155216c9d1b34c891bcb14a5cf87a7a67",
        [TableColumnStateValue.Hover]: "a653727a242e3a26cee656bc0f378eb311e608a4",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "6dfb2960d3eecd4b46e8390d2e973936e9e6a1e3",
        [TableColumnStateValue.Hover]: "7e9800cec321068feb38daad58812f2b42a95c09",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "",
        [TableColumnStateValue.Hover]: "",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.Spacer]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "ad63c39fe00d7ff4d67295534fd39d26a9a3e5f6",
        [TableColumnStateValue.Hover]: "",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "b96991c07d664b4e86915aa2c33abdea5e5da609",
        [TableColumnStateValue.Hover]: "",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "2f28e0a46b9c97659f67ef3baacb06f3a3b3c4bc",
        [TableColumnStateValue.Hover]: "",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.CustomiseColumn]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "",
        [TableColumnStateValue.Hover]: "",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "",
        [TableColumnStateValue.Hover]: "",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "a70b3dd66662120f98298d802b488034ff60d8fd",
        [TableColumnStateValue.Hover]: "9ffb054b91ac1b7f258c7b48ffe8626bae65fe6f",
        [TableColumnStateValue.Active]: "d3951e7e2088a15e654f13bf93d5099b62bd2923"
      }
    }
  },
  [TableColumnTypeValue.Cell]: {
    [TableColumnVariantValue.Text]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "ed079aeaba0b5376f2727d244e20ed904fd65beb",
        [TableColumnStateValue.Hover]: "0e81c41d53d8aa2d57f0a00e554e8190c4dd9132",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "50dc229f2f4ccbb58a97dbb6d7e7cba68cd43dd5",
        [TableColumnStateValue.Hover]: "d21ff6c101eb303aef067220e7e2ad1dab0913fb",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "ba1d6a04b098e36b2e1ad8a86b48c024c8f4bfc4",
        [TableColumnStateValue.Hover]: "3a2485d11c40e6573bcb4bbaa393d82d05f86303",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.Amount]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "8bc7a0dba69109ead6807999c4de836e8b1b78c1",
        [TableColumnStateValue.Hover]: "16098bd2006d041bde8de3aa23a7b4842115d021",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "e5b75bb377951a5036967c9e516573e180a4d4c0",
        [TableColumnStateValue.Hover]: "aa662217f57a39cdbf657664be4d0e5500b03169",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "8e7a2d4e8e648af27781760afe39b58eb4729488",
        [TableColumnStateValue.Hover]: "5c5472ad80c454c2e92be563726baf4b5801d0b1",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.Date]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "27cbaed7b6f91af7754ce38864bfa9df25bf8701",
        [TableColumnStateValue.Hover]: "3455fd8b500e1c10d912330dddceca1510450f46",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "a06d3f4e8d213f238e982722526cc5a0f3938851",
        [TableColumnStateValue.Hover]: "ac29fdab3655862e4347d88f138199df2ffab6c0",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "ab7835eb8817600c5d9ad6172e1b4906729c84e6",
        [TableColumnStateValue.Hover]: "5bdd2337c957de335a7871a32b6990e34feeb99f",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.Tag]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "d844d69ae3b17d227abf0218119ea7d2b3c6573c",
        [TableColumnStateValue.Hover]: "261181e92f06a6690ce6b5c80dc7a7c3f163d607",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "ceeb503ad46397226ae9960118e9287baa784da6",
        [TableColumnStateValue.Hover]: "6ac62da76a823eec0c1d15ef56f2ae2902e913a1",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "a8616f7e89e4143747999f22a4521aab1266c3d3",
        [TableColumnStateValue.Hover]: "6ef055d3cf7afa1803fc22be8ecf5a1ebb9402c0",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.Icon]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "6e6864ade800c1f6bb11b6a4c93922075aa34fa9",
        [TableColumnStateValue.Hover]: "4249b9c86855fbc069ea0370de54039d49825e51",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "a718ddacd5a2463390f0b0c42361b31050078241",
        [TableColumnStateValue.Hover]: "3664d84a0299f639a26197e7c5e2c2270cc0c9ba",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "06cd459a5d04991e8669c7224900ecee05481231",
        [TableColumnStateValue.Hover]: "871d00b97f0a582d90753df0d0a82cb882384c22",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.Checkbox]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "b2498ee37331252a44b2fdfb43abe8533d7b19fe",
        [TableColumnStateValue.Hover]: "c4dcc3c3b0000170f740a5b14a5e208b785ff540",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "c292e967330b3ccb4d04e7c0407ca4d4263ff314",
        [TableColumnStateValue.Hover]: "dd85216592388f82ec79f7b4f965d2f918439ff6",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "ea6f5d056538189fc8dc6d5b7fcea450fca28a19",
        [TableColumnStateValue.Hover]: "7f96ca30a3804764a4414ff61ea72b4549f3d68b",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.Spacer]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "85079ed8f742b89a667886331ec907b09ff1660b",
        [TableColumnStateValue.Hover]: "f9385f3566a256bea6f0f9394473587abbc26fc5",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "daed6fe05356b9f799c1d41a91dd58a82031062e",
        [TableColumnStateValue.Hover]: "5da964db8480059b7742cb21c8a9d2b1a0129d7f",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "ec5bab0d3bb8c4619d5b44c9da2249c119baf367",
        [TableColumnStateValue.Hover]: "66f156d71217e997a8daa794cb3ec6cd46074d0a",
        [TableColumnStateValue.Active]: ""
      }
    },
    [TableColumnVariantValue.User]: {
      [TableColumnPositionValue.Left]: {
        [TableColumnStateValue.Default]: "eb4b8b0347002e24112fc84f9b86bd73b9a5fabc",
        [TableColumnStateValue.Hover]: "63e489f7ec674c287f33a46c706628cf0073c931",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Intermediate]: {
        [TableColumnStateValue.Default]: "4023673df7e8af5c2ae1b9e1485118305e8f2948",
        [TableColumnStateValue.Hover]: "0b738aae710de3051532bf7d7cd7cabf11ee4a89",
        [TableColumnStateValue.Active]: ""
      },
      [TableColumnPositionValue.Right]: {
        [TableColumnStateValue.Default]: "658c7aff1b26ed7b3bed105e3a9e9f4b923df2c7",
        [TableColumnStateValue.Hover]: "e7d73b0a0fd85506986dddfa3e2bc36c1bbe70ca",
        [TableColumnStateValue.Active]: ""
      }
    }
  }
};

export function getTableColumnKey(
  type: TableColumnTypeValue,
  variant: TableColumnVariantValue,
  position: TableColumnPositionValue,
  state: TableColumnStateValue = TableColumnStateValue.Default
): string {
  const typeObj = tableColumnRegistry[type];
  if (!typeObj) throw new Error(`Invalid type: ${String(type)}`);

  const variantObj = typeObj[variant];
  if (!variantObj) throw new Error(`Invalid variant: ${String(variant)}`);

  const positionObj = variantObj[position];
  if (!positionObj) throw new Error(`Invalid position ${String(position)} for variant ${String(variant)}`);

  const key = positionObj[state];
  if (!key) throw new Error(`Invalid state ${String(state)} for position ${String(position)} and variant ${String(variant)}`);

  return key;
}

export function createTableColumnProperties(
  type: TableColumnTypeValue,
  variant: TableColumnVariantValue,
  position: TableColumnPositionValue,
  state: TableColumnStateValue = TableColumnStateValue.Default,
  label?: string,
  value?: string
): TableColumnProperties {
  return {
    Type: type,
    Position: position,
    Variant: variant,
    State: state,
    label,
    value
  };
} 